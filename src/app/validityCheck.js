export function nonEmptyText (value) {
    if (value === "") {
        return false
    } else {
        return true
    }
}

export function minLengthText (value, requiredLength) {
    if (value) {
        if (value.length < requiredLength) {
            return false
        } else {
            return true
        }
    }
}

export function areBothTextsTheSame (textOne, textTwo) {
    if (textOne === textTwo) {
        return true
    } else {
        return false
    }
}

export function isTextAnEmail (value) {
    if (value.includes("@")) {
        return true
    } else {
        return false
    }
}

export function isTextAPassword (value, length) {
    const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"|,.<>\/?]+/;`
    const doesItHaveSpecialCharacters = specialChars.split("").some(character => value.includes(character));
    const numbers = "1234567890";
    const doesItHaveNumbers = numbers.split("").some(number => value.includes(number));
    if (doesItHaveSpecialCharacters) {
        if (doesItHaveNumbers) {
            if (value.length > length) {
                if (value !== value.toLowerCase()) { //this checks if the string has at least one uppercase letter
                    if (value !== value.toUpperCase()) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }        
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}