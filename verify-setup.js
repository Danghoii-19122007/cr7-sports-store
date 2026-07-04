#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('✅ CR7 Sports Store - Setup Verification\n');

const checks = [
  {
    name: 'Project directory',
    check: () => fs.existsSync(path.join(__dirname, 'package.json')),
  },
  {
    name: '.env.local file',
    check: () => fs.existsSync(path.join(__dirname, '.env.local')),
  },
  {
    name: 'Momo API client',
    check: () => fs.existsSync(path.join(__dirname, 'src', 'lib', 'momo.ts')),
  },
  {
    name: 'Checkout API endpoint',
    check: () => fs.existsSync(path.join(__dirname, 'src', 'app', 'api', 'checkout', 'route.ts')),
  },
  {
    name: 'Momo callback endpoint',
    check: () => fs.existsSync(path.join(__dirname, 'src', 'app', 'api', 'momo-callback', 'route.ts')),
  },
  {
    name: 'Updated product images',
    check: () => {
      const productsFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'products.ts'), 'utf-8');
      return productsFile.includes('unsplash.com');
    },
  },
  {
    name: 'Updated Hero with image',
    check: () => {
      const heroFile = fs.readFileSync(path.join(__dirname, 'src', 'components', 'Hero.tsx'), 'utf-8');
      return heroFile.includes('unsplash.com');
    },
  },
];

checks.forEach(({ name, check }) => {
  const result = check();
  const icon = result ? '✅' : '❌';
  console.log(`${icon} ${name}`);
});

console.log('\n✅ Setup verification complete!');
console.log('\n📝 Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Open: http://localhost:3000');
console.log('3. Go to /shop and add items to cart');
console.log('4. Proceed to checkout and select Momo payment');
console.log('5. Fill in your details and click "XÁC NHẬN THANH TOÁN"');
console.log('\n💡 Note: Test mode uses Momo sandbox environment');
console.log('📚 For production, update .env.local with your actual Momo credentials');
