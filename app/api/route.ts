import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
        const x = await pool.query('select * from tasks')
        
        return NextResponse.json({msg: 'fetched ', rows: x.rows})
    } catch (error) {
        return NextResponse.json({msg: 'something went wrong'})
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const x = await req.json()
        const newTodo = await pool.query(`insert into tasks (title) values ('${x.title}')`)
        return NextResponse.json({msg: 'added'})
        
    } catch (error) {
        return NextResponse.json({msg: 'something went wrong'})
    }
    const x = await req.json()
    console.log(x)
   return NextResponse.json({msg: 'fine'})
}
