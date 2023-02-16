export default function time() {
    const mounth = new Date().getMonth() + 1
    const day = new Date().getDate().toString()
    const hour = new Date().getHours().toString()
    const minutes = new Date().getMinutes().toString()
    const date = mounth.toString() + day + hour + minutes

    return Number(date)
}