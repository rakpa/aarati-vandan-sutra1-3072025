import path from 'path'
import sharp from 'sharp'

const outputDir = path.resolve(process.cwd(), 'public/icons')
const sizes = [192, 512, 1024]

async function verify() {
	for (const size of sizes) {
		const filePath = path.join(outputDir, `icon-${size}x${size}.png`)
		const meta = await sharp(filePath).metadata()
		if (meta.width !== size || meta.height !== size) {
			throw new Error(`Invalid dimensions for ${filePath}: ${meta.width}x${meta.height}`)
		}
		if (meta.format !== 'png') {
			throw new Error(`Invalid format for ${filePath}: ${meta.format}`)
		}
		console.log(`OK  ${filePath}  ${meta.width}x${meta.height}  format=${meta.format}`)
	}
	console.log('All icon files verified successfully.')
}

verify().catch((err) => {
	console.error(err)
	process.exit(1)
})