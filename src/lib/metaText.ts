export function expandDescription(description: string, title: string, lang: 'en' | 'tr' = 'en') {
  const name = String(title || 'LitxTech').split('|')[0].trim() || 'LitxTech'
  const text = String(description || '').replace(/\s+/g, ' ').trim()
  if (text.length >= 120 && text.length <= 160) return text
  if (text.length > 160) {
    const cut = text.slice(0, 150).replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '')
    return `${cut}.`
  }
  const lead = text ? text.replace(/\.+$/, '') : name
  let combined =
    lang === 'tr'
      ? `${lead}. ${name} sayfası LitxTech resmi sitesinde yayımlanır ve güncel bilgiyi içerir.`
      : `${lead}. The ${name} page is published on the official LitxTech website with current information.`
  if (combined.length < 120) {
    combined +=
      lang === 'tr'
        ? ' İletişim ve destek bağlantıları bu sayfadadır.'
        : ' Contact and support links are available on this page.'
  }
  if (combined.length > 160) {
    combined = `${combined.slice(0, 150).replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '')}.`
  }
  return combined
}
