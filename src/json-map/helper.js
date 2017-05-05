export const calSentenceLength = (sentence, fontSize) => {
    if (sentence && fontSize) {
        let totalLength = sentence.toString().length;
        let zns = sentence.toString().match(/[\u4e00-\u9fa5]/g);
        let znLength = zns ? zns.length : 0;
        let caps = sentence.toString().match(/[A-Z]/g);
        let capLength = caps ? caps.length : 0;
        let capSize = Math.ceil(fontSize * 2 / 3);
        let symbolSize = Math.ceil(fontSize / 2);
        return znLength * fontSize + capLength * capSize + (totalLength - znLength - capLength) * symbolSize;
    } else
        return 0
};


export const updateProperty = (targetObj, oldPro, newPro) => {
    if (targetObj && (oldPro || oldPro === '') && (newPro || newPro === '')) {
        newPro = !(/^[\d]+$/.test(newPro)) ? newPro : '#'.concat(newPro) === oldPro ? newPro.concat('#') : '#'.concat(newPro);
        if (oldPro === newPro) {
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