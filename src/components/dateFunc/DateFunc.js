export default function data() {
    let time = new Date()
    let d = time.getDate().toString()
    let m = time.getUTCMonth() + 1
    m = m.toString()
    let y = time.getFullYear().toString()
    let h = time.getHours().toString()
    let min = time.getMinutes().toString()

    if (h.length < 2) { h = '0' + h }
    if (min.length < 2) { min = '0' + min }
    if (m.length < 2) { m = '0' + m }
    return d + '.' + m + '.' + y + ' ' + h + ':' + min
}