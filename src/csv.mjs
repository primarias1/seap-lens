import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { parseFile } from "fast-csv";

export const parser = () => {
    // See https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#no-__filename-or-__dirname
    const __filename = fileURLToPath(import.meta.url);
    const path = resolve(
        dirname(__filename),
        'data',
        'Lista_EP_portal_01102021.csv'
    );

    const headers = [
        undefined, // Judet
        'cif',
        'name',
        undefined, // Denumire UAT
        undefined, // Adresa
        'principal',
        undefined, // Denumire ord credite 1
        undefined, // CIF ord credite 2
        undefined // Denumire ord credite 2
    ]

    parseFile(path, { headers: headers, delimiter: ';' })
        .on('error', error => console.error(error))
        .on('data', row => console.log(row));
}
