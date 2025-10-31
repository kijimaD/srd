import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request, { params }) {
  const resolvedParams = await params
  const requestedPath = resolvedParams.path.join('/')
  const baseDir = path.join(process.cwd(), 'pdfs')
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[\/\\])+/, '')
  const absolutePath = path.resolve(baseDir, safePath)

  // Security check
  if (!absolutePath.startsWith(baseDir)) {
    return new NextResponse('Access denied', { status: 403 })
  }

  if (!fs.existsSync(absolutePath)) {
    return new NextResponse('File not found', { status: 404 })
  }

  const fileBuffer = fs.readFileSync(absolutePath)

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${path.basename(absolutePath)}"`,
    },
  })
}
