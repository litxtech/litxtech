export function expandDescription(description: string, title: string) {
  const name = String(title || 'LitxTech').split('|')[0].trim() || 'LitxTech'
  const text = String(description || '').replace(/\s+/g, ' ').trim()
  if (text.length >= 120 && text.length <= 160) return text
  if (text.length > 160) {
    const cut = text.slice(0, 150).replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '')
    return `${cut}.`
  }
  const lead = text ? text.replace(/\.+$/, '') : name
  let combined = `${lead}. ${name} sayfası LitxTech resmi sitesinde yayımlanır ve güncel bilgiyi içerir.`
  if (combined.length < 120) combined += ' İletişim ve destek bağlantıları bu sayfadadır.'
  if (combined.length > 160) {
    combined = `${combined.slice(0, 150).replace(/\s+\S*$/, '').replace(/[.,;:\s]+$/, '')}.`
  }
  return combined
}
