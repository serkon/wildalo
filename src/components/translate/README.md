# Translate

Bu script uygulama içerisindeki dil değişimini yapmayı sağlar. Hızlı ve basit bir şekilde React tabanlı uygulamalara eklenebilmesi için yazdım. Entegrasyon işlemi 2 adımdan oluşuyor:

### 1. Adım
React'ın en tepesine `Language` class'ına ait tag'i eklemeniz gerekir. Daha doğrusu ilk nereden başlamasını istiyorsanız bu `Language` sınıfını 

```typescript
<Language>
  <App />
</Language>
```

### 2. Adım
Kullanmak istediğiniz yere context ekleyerek dil değişim işlemlerini yapabilirsiniz. 3 adet değer dönüyor.

- t: Translate fonksiyonu: 2 adet parametre alıyor: key ve param. Dil dosyası içerisindeki key'e bakar ve parametre varsa günceller. Örneğin: `t('hello', {count: 2})`
- tChange: Dil değiştirmeye yarar. Örneğin: `tChange('tr')`
- tState: Dil ile ilgili değerleri döner. Örneğin: `{language: 'tr', content: {hello: 'Merhaba, count {param}'}}`

2 adet örnek ekledim. Function ve Class componentler için örnekleri bulabilirsiniz.

```typescript
// sample 1
export const AnimalCardWithFunction = (props: React.PropsWithChildren<Props>): JSX.Element => {
  const { t, tChange, tState } = useTranslate();
  const classes = ['content'];
  if (props.className) {
    classes.push(props.className);
  }
  return (
    <Box className="animal-card">
      <Button onClick={()=>tChange('tr')}>{t('withParam', { 'param': 'level 2' })}</Button>
    </Box>
  );
};
```

```typescript
// sample 2
export class AnimalCardWithClass extends React.Component<Props> {
  static contextType = LanguageContext;

  render(): React.ReactNode {
    return (
      <Box className="animal-card">
        <Button>{this.context.t('withParam', { 'param': 'level 2' })}</Button>
      </Box>
    );
  }
}
```
