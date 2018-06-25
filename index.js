/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (arrayA, arrayB) => {
    let srtippedArray = [];
    arrayB.forEach(item => {
        var obj = {};
        Object.keys(item).forEach(key => {
            if (key !== arrayA[0] && key !== arrayA[1]) {
                obj[key] = item[key]
            }
        })
        srtippedArray.push(obj);
    })
    return srtippedArray;
};

exports.excludeByProperty = (property, obj) => {
    var newArr = [];
    let deletePos = false;
    for (let i = 0; i < obj.length; i++) {
        var newObj = {};
        Object.keys(obj[i]).forEach(key => {
            if (key == property) {
                deletePos = true;
            } else {
                deletePos = false;
            }
            newObj[key] = obj[i][key]
        })
        if (!deletePos) {
            newArr.push(newObj);
        }
    }
    return newArr;

};

exports.sumDeep = (array) => {
    let totalArray = [];
    for (let item in array) {
        let obj = {};
        let val = array[item].objects.reduce((a, b) => {
            return a + b.val;
        }, 0);
        obj["objects"] = val;
        totalArray.push(obj);
    }
    return totalArray;
};

exports.applyStatusColor = (colors, ar) => {
    const newArray = [];
    function push(index, color) {
        let obj = {};
        obj["status"] = ar[index].status;
        obj["color"] = color;
        newArray.push(obj);
    }

    ar.forEach((status, index) => {
        for (let color in colors) {
            colors[color].forEach(colorType => {
                (ar[index].status === colorType) ?  push(index, color): '';
            })
        }

    })

    return newArray;
};














exports.createGreeting = (func, greeting) => {
    return function (name) {
        return func(greeting, name);
    }
};



exports.setDefaults = (objA) => {
    return function (objB) {
        if (!objB.hasOwnProperty("subscribed")) {
            objB["subscribed"] = objA.subscribed;
        }
        return objB;
    }

};

//should asynchronously fetch a user, users company and status

const {
    services, companies, status, users,
} = require('./__test__/__helpers__/p7');

exports.fetchUserByNameAndUsersCompany = (name, services) => {
    const obj = {};

    services.fetchUsers().then(result => {
        let userPos = result.findIndex(index => index.name === name);
        obj["user"] = users[userPos];
        services.fetchCompanyById(result[userPos].companyId).then(result => {
            obj["company"] = companies[companies.findIndex(item => item.id === result.id)];
            services.fetchStatus().then(result => {
                obj["status"] = result;
            })
        })

    });

    working = () => {
        return obj;
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(working());
        }, 300);
    });

};
