import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:process.env.PAGES_BASE_PATH||'/',build:{outDir:'github-dist'},server:{host:'127.0.0.1',port:5173,strictPort:true,watch:{usePolling:true}},preview:{host:'127.0.0.1',port:5173,strictPort:true}});
