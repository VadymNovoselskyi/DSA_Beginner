function reverse(source: string): string{
    if (source.length === 1) return source;
    return source[source.length - 1] + reverse(source.slice(0, source.length - 1));
  }
  
//   reverse('awesome') // 'emosewa'
  // reverse('rithmschool') // 'loohcsmhtir'