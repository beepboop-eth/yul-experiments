const fs = require('fs');
const solc = require('solc');

const yulSource = fs.readFileSync('ERC20Token.yul', 'utf8');

const input = {
  language: 'Yul',
  sources: {
    'ERC20Token.yul': {
      content: yulSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors.length > 0) {
  console.error('Compilation errors:');
  output.errors.forEach((error) => console.error(error.formattedMessage));
} else {
  console.log('Compiled successfully');
  fs.writeFileSync('ERCToken.bin', output.contracts['ERC20Token.yul']['Token'].evm.bytecode.object, 'hex');
}
