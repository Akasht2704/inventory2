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
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const brandId = decoded.brandId;
        const body = await request.json();
        const { id, amount, type, name, sku, price } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Product id is required" },
                { status: 400 }
            );
        }

        // Stock in / out
        if (type === "add" || type === "remove") {
            const parsedAmount = Number(amount) || 0;
            let sql;
            if (type === "add") {
                sql = "UPDATE products SET quantity = quantity + ? WHERE id = ? AND brandId = ?";
            } else {
                sql = "UPDATE products SET quantity = GREATEST(quantity - ?, 0) WHERE id = ? AND brandId = ?";
            }
            await pool.execute(sql, [parsedAmount, id, brandId]);
            return NextResponse.json(
                { success: true, message: "Stock updated successfully" },
                { status: 200 }
            );
        }

        // Edit product details
        if (name !== undefined || sku !== undefined || price !== undefined) {
            if (!name?.trim() || !sku?.trim()) {
                return NextResponse.json(
                    { success: false, message: "Name and SKU are required" },
                    { status: 400 }
                );
            }
            const sql =
                "UPDATE products SET name = ?, sku = ?, price = ? WHERE id = ? AND brandId = ?";
            const [result] = await pool.execute(sql, [
                name.trim(),
                sku.trim(),
                Number(price) || 0,
                id,
                brandId,
            ]);
            if (result.affectedRows === 0) {
                return NextResponse.json(
                    { success: false, message: "Product not found" },
                    { status: 404 }
                );
            }
            return NextResponse.json(
                { success: true, message: "Product updated successfully" },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Invalid update payload" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const token = request.headers.get("Authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const brandId = decoded.brandId;
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Product id is required" },
                { status: 400 }
            );
        }

        const [result] = await pool.execute(
            "DELETE FROM products WHERE id = ? AND brandId = ?",
            [id, brandId]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}

