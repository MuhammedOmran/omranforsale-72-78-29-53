# إصلاح مشكلة electron في package.json

## المشكلة
electron و electron-builder موجودان في dependencies بدلاً من devDependencies

## الحل

1. افتح ملف `package.json` 
2. انقل السطور التالية من `dependencies` إلى `devDependencies`:

```json
"electron": "^37.3.0",
"electron-builder": "^26.0.12",
```

3. احذف هذين السطرين من قسم `dependencies` (السطر 59-60)
4. أضفهما في قسم `devDependencies` 

## النتيجة النهائية
بعد التعديل، قسم devDependencies يجب أن يحتوي على:
```json
"devDependencies": {
    "@eslint/js": "^9.9.0",
    // ... باقي الحزم
    "electron": "^37.3.0", 
    "electron-builder": "^26.0.12",
    "vite": "^5.4.1"
}
```

## بعد التعديل
شغّل الأمر:
```bash
npm install
```

ثم جرب بناء التطبيق مرة أخرى باستخدام:
```bash
npm run build && npx electron-builder --win
```

## ملاحظة مهمة
التطبيق تم بناؤه بنجاح رغم التحذير، والملفات موجودة في مجلد `dist-electron`