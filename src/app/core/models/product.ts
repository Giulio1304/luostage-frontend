/* il model rappresenta tutti i dati che il front-end si aspetta di ricevere o inviare al back-end:
Angular conosce il tipo degli oggetti, il controllo dei tipi con ts. */

export interface Product {
id: number;
descrizione: string;
quantita: number;
prezzo: number;
}
