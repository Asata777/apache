import got from 'got';
import config from 'config';
const default_headers: Record<string, string | string[]> = config.get('default_headers'),
    default_hash: string = config.get('default_hash');

const httpRequest = {
    async get(path: string, with_uri: boolean = false, headers = default_headers): Promise<string | object> {
        const uri = with_uri ? path : `http://www.mafia-rules.net/standalone/${path}/`,
            { body }: any = await got.get(uri, {
                headers: headers,
                responseType: with_uri ? 'json' : 'text'
            });
        return body;
    },
    async post(data: object, hash: string | boolean = default_hash, headers = default_headers): Promise<any> {
        const uri = `http://www.mafia-rules.net/standalone/${hash}/DO/${Math.random()}`,
            body = await got.post(uri, {
                form: data,
                headers: headers
            }).json();
        return body;
    }
}
export default httpRequest;