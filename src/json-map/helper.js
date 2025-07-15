export const measure_width = (words) => {
    let sp = document.getElementById("sp");
    sp.innerHTML = words;

    return sp.clientWidth;
};


export const updateProperty = (targetObj, oldPro, newPro) => {
    if (targetObj && (oldPro || oldPro === '') && (newPro || newPro === '')) {
        // Avoid conflicts with numeric keys by adding suffix if needed
        let finalNewPro = newPro;
        if (/^[\d]+$/.test(newPro)) {
            finalNewPro = oldPro === '#' + newPro ? newPro + '#' : '#' + newPro;
        }
        
        if (oldPro === finalNewPro || targetObj.hasOwnProperty(finalNewPro)) {
            return;
        }
        
        let newObj = {};
        Object.keys(targetObj).forEach(pro => {
            if (pro === oldPro) {
                newObj[finalNewPro] = targetObj[pro];
            } else {
                newObj[pro] = targetObj[pro];
            }
            delete targetObj[pro];
        });
        Object.keys(newObj).forEach(pro => targetObj[pro] = newObj[pro]);
    }
};

export const insertProperty = (targetObj, insertFromPro) => {
    if (targetObj) {
        if (insertFromPro) {
            let newObj = {};
            Object.keys(targetObj).forEach(pro => {
                if (pro === insertFromPro) {
                    newObj[pro] = targetObj[pro];
                    newObj[''] = '';
                } else {
                    newObj[pro] = targetObj[pro];
                }
                delete targetObj[pro];
            });
            Object.keys(newObj).forEach(pro => targetObj[pro] = newObj[pro]);
        }
        else if (insertFromPro === undefined || insertFromPro === null) {
            targetObj[''] = '';
        }
    }
};