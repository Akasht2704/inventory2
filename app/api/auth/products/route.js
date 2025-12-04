import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function GET(request) {

    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const brandId = bcrypt.decode(token);
    const sql = "SELECT * FROM products WHERE brandId = ?";
    try {
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
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const brandId = bcrypt.decode(token);
    const { name, sku, price, categoryId } = await request.json();
    const sql = "INSERT INTO products (name, sku, price, categoryId, brandId) VALUES (?, ?, ?, ?, ?)";
    try {
        const [result] = await pool.execute(sql, [name, sku, price, categoryId, brandId]);
        return NextResponse.json(
            { id: result.insertId, name, sku, price, categoryId, brandId },
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
