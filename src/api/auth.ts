const API_KEY = '9e73e182f44ee0cb3ec6bedd85f2bf0d'
export async function authorize() {
    const response = await fetch(`http://www.last.fm/api/auth/?api_key=${API_KEY}`)
    console.log("Response",response)
}