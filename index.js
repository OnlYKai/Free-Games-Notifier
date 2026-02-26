import fs from 'fs'

const api_key = process.env.API_KEY
const webhook_url = process.env.WEBHOOK_URL

/// SETTINGS START ///
const include_mature = true
const country_code = 'DE' // https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements
const shop_ids = [61, 16] // https://api.isthereanydeal.com/service/shops/v1
const message = (game) => {
    const role_id = '1475596100160323768'
    const timestamp = new Date(game.deal.expiry).getTime() / 1000
    const regular_price = `${game.deal.regular.amount} ${game.deal.regular.currency}`
    const current_price = game.deal.price.amount === 0 ? 'FREE' : `${game.deal.price.amount } ${game.deal.price.currency}`
    return {
        'content': `<@&${role_id}>`,
        'embeds': [
            {
                'title': `${game.title}`,
                'url': `${game.deal.url}`,
                'description': `Platform: ${game.deal.shop.name}\n\n:dollar: **~~${regular_price}~~ ➜ ${current_price}**\n:red_circle: Ends <t:${timestamp}:R>\n\u200B`,
                'thumbnail': {
                    'url': `${game.assets.boxart}`
                },
                'footer': {
                    'text': '\nDeals fetched from IsThereAnyDeal.com'
                }
            }
        ]
    }
}
/// SETTINGS END ///

const filter = 'N4IgDgTglgxgpiAXKAtlAdk9BXANrgGhBQEMAPJABgF9qg%3D%3D' // Max Price = 0; Way faster if used with sort=price, probably because it stops checking after encountering the first too expensive game.

const url = `https://api.isthereanydeal.com/deals/v2?key=${api_key}&limit=200&sort=price&filter=${filter}&mature=${include_mature}&country=${country_code}&shops=${shop_ids.join()}`

const deals_response = await fetch(url)
const deals = await deals_response.json()
const games = deals.list

let previous_ids = []
if (fs.existsSync('previous_ids.json')) {
    previous_ids = JSON.parse(fs.readFileSync('previous_ids.json'))
}
const ids = []
for(const game of games) {
    ids.push(game.id)
    if (previous_ids.includes(game.id)) continue
    await fetch(webhook_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message(game))
    })
}
fs.writeFileSync('previous_ids.json', JSON.stringify(ids))

