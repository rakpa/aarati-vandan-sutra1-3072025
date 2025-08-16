import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import sharp from 'sharp'

const outputDir = path.resolve(process.cwd(), 'public/icons')
const sizes = [192, 512, 1024]

const background = { r: 139, g: 0, b: 0 }

async function generateIcon(size) {
	const pngBuffer = await sharp({
		create: {
			width: size,
			height: size,
			channels: 3,
			background,
		},
	})
		.png({ compressionLevel: 9 })
		.toBuffer()

	const filePath = path.join(outputDir, `icon-${size}x${size}.png`)
	await writeFile(filePath, pngBuffer)
	const meta = await sharp(filePath).metadata()
	if (meta.width !== size || meta.height !== size) {
		throw new Error(`Icon ${filePath} has incorrect dimensions: ${meta.width}x${meta.height}`)
	}
	return filePath
}

async function main() {
	await mkdir(outputDir, { recursive: true })
	for (const size of sizes) {
		const fp = await generateIcon(size)
		console.log(`Generated: ${fp}`)
	}
	console.log('All icons generated successfully.')
}

main().catch((err) => {
	console.error(err)
	process.exit(1)
})