import { serverUnauth } from "./apiCall"

export const getFeidlValue = (formKey, formValue, fieldValue, setLoading, setData, setMasterData, route) => {
    delete formValue["rank"]
    const dataObject = { ...formValue }
    Object.keys(dataObject).map(val => dataObject[val].length === 0 ? delete dataObject[val] : null)
    if (!dataObject[formKey]) {
        dataObject[formKey] = fieldValue
    }
    else {
        dataObject[formKey] = []
    }
    setLoading(true)
    serverUnauth.post(route, dataObject)
        .then((res) => {
            setMasterData(res?.data?.data)
            const dataSet = res?.data?.data
            const newObject = {}
            dataSet.map((val, index) =>
                Object.keys(val).map((val1) => {
                    if (val1 in newObject) {
                        newObject[val1].push(dataSet[index][val1])
                    }
                    else {
                        newObject[val1] = [dataSet[index][val1]]
                    }
                }
                ))
            Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
                index) => newObject[val].indexOf(item) === index).sort())
            setData(newObject)
        })
        .catch((err) => { console.log(err) })
        .finally(() => { setLoading(false) })
}


export const updatedFieldValue = (masterData, values, setData) => {
    const dataSet = masterData
    const newObject = {}
    for (let index = 0; index < dataSet.length; index++) {
        Object.keys(values).map(
            valueKey => {
                if (valueKey !== "rank") {
                    if (values[valueKey].includes(dataSet[index][valueKey]) || values[valueKey].length === 0) {
                        if (valueKey in newObject) {
                            newObject[valueKey].push(dataSet[index][valueKey])
                        }
                        else {
                            newObject[valueKey] = [dataSet[index][valueKey]]
                        }
                    }
                }
            }
        )
    }
    Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
        index) => newObject[val].indexOf(item) === index))
    setData(newObject)
}

export const getFeildColor = (value) => {
    var hue = ((1 - value) * 280).toString(10);
    return ["hsl(", value, ",100%,50%)"].join("");
}