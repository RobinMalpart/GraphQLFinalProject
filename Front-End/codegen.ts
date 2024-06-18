import { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'http://localhost:3000/graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript']
    }
  }
};
export default config;