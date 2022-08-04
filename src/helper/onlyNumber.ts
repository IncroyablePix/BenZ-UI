export function isFloat(value: string): string | null {
    const val = value.
        replace(/[^\d.-]/g, "").
        replace(/(\..*?)\..*/g, "").
        replace(/(?<!^)-/g, "");

    const flt = parseFloat(val);
    const strFlt = flt.toString();
    return val !== "" ?
        val :
        null;
}

export function isExtension(value: string): string | null {
    const val = value.
        replace(/\s/g, "").
        replace(/[^a-zA-Z\d]*/g, "");

    const dottedVal = `.${val}`;
    return dottedVal.match(/\.([a-zA-Z\d]+)$/) ? dottedVal : null;
}