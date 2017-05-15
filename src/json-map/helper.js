export const measure_width = (words) => {
    let sp = document.getElementById("sp");
    sp.innerHTML = words;

    return sp.clientWidth;
};


export const updateProperty = (targetObj, oldPro, newPro) => {
    if (targetObj && (oldPro || oldPro === '') && (newPro || newPro === '')) {
        newPro = !(/^[\d]+$/.test(newPro)) ? newPro : '#'.concat(newPro) === oldPro ? newPro.concat('#') : '#'.concat(newPro);
        if (oldPro === newPro || targetObj.hasOwnProperty(newPro)) {
            return;
        }
        let newObj = {};
        Object.keys(targetObj).forEach(pro => {
            pro === oldPro ? newObj[newPro] = targetObj[pro] : newObj[pro] = targetObj[pro];
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