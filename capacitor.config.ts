import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.aarti.app',
	appName: 'Aarti',
	webDir: 'dist',
	bundledWebRuntime: false,
	server: {
		androidScheme: 'https',
		cleartext: true
	}
};

export default config;