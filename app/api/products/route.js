import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const brandId = decoded.brandId;

        console.log("brandId --->", brandId);

        const sql = "SELECT * FROM products WHERE brandId = ?";
        const [rows] = await pool.execute(sql, [brandId]);

        return NextResponse.json(rows, { status: 200 });

    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const brandId = decoded.brandId;

        const { name, sku, price, categoryId } = await request.json();

        const sql =
            "INSERT INTO products (name, sku, price, categoryId, brandId) VALUES (?, ?, ?, ?, ?)";
        
        const [result] = await pool.execute(sql, [
            name,
            sku,
            price,
            categoryId,
            brandId,
        ]);

        return NextResponse.json(
            {
                id: result.insertId,
                name,
                sku,
                price,
                categoryId,
                brandId,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];  
        if (!token) {
            return NextResponse.json(
                { success:false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const brandId = decoded.brandId;

        const { id, amount, type } = await request.json();
        const parsedAmount = Number(amount)||0;
        let sql;

        if (type === "add") {
            sql = "UPDATE products SET quantity = quantity + ? WHERE id = ? AND brandId = ?";
        } else if (type === "remove") {
            sql = "UPDATE products SET quantity = GREATEST(quantity - ?, 0) WHERE id = ? AND brandId = ?";
        } else {
            return NextResponse.json(
                { success:false, message: "Invalid type" },
                { status: 400 }
            );
        }
        await pool.execute(sql, [parsedAmount, id, brandId]);

        return NextResponse.json(
            { success:true, message: "Stock updated successfully" },
            { status: 200 }
        );  
    } catch (error) {
        console.error("Error updating stock:", error);
        return NextResponse.json(
            { success:false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
        
