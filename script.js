const exercise = JSON.parse(localStorage.getItem('exercise')) || [] // тут хранятся тренировки
const exerGrup = JSON.parse(localStorage.getItem('exerGrup')) || [] // тут хранятся группы тренировок

//------------------------------------------------------------
function data() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    return today = dd + '.' + mm + '.' + yyyy;
}

//------------------------------------------------------------------------------------
function createCard(exer, time, id, date) {
    return `
    
        <div class = 'exerCard'>
            <div class='head'>
            <h3>${exer}</h3>
            </div>
            <h4>${time}</h4>
            <h5>${date}</h5>
            <button data-id = '${id}' class = 'dellCard'>Dell</button>
        </div>

    `
}
//-----------------------------------------------------

function render() {
    let html = exercise.map(el => {
        return createCard(el.exer, el.time, el.id, el.date)
    }).join('')

    document.querySelector('.content').innerHTML = html
    dell()
    addExercise()
    select()
    selctData()
}

//---------------------------------------------------------------------------------------
function dell() {
    const buttonsDell = document.querySelectorAll('.dellCard')
    buttonsDell.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let findIndex = exercise.findIndex(el => el.id == e.target.dataset.id)
            exercise.splice(findIndex, 1)
            localStorage.setItem('exercise', JSON.stringify(exercise))
            render()
        })
    })
}


function addExercise() {
    // создаём выпадающий список
    function createSelectGrup(exer) {
        return `
            <option class = 'grup'>${exer}</option>
        `
    }

    let selectHtmlGrup = exerGrup.map(el => {
        return createSelectGrup(el)
    })

    document.querySelector('.selectGrup').innerHTML = `<option selected = 'selected'>Select exercise</option>` + selectHtmlGrup

    // реализуем добавление тренировок
    let btnAdd = document.querySelector('.btnAdd')
    let listGrup = document.querySelectorAll('.selectGrup')
    let inpTime = document.querySelector('.inpTime')

    btnAdd.addEventListener('click', () => {
        listGrup.forEach(el => {
            if (inpTime.value && el.value != 'Select exercise') {
                const add = {
                    exer: el.value,
                    time: inpTime.value,
                    id: Math.random(),
                    date: data()
                }
                exercise.push(add)
                localStorage.setItem('exercise', JSON.stringify(exercise))
                inpTime.value = ''
                select()
                selctData()
                render()
            }
        })
    })
}


function addExerGrup() {
    let inpExerGrup = document.querySelector('.exerGrup')
    let btnAddExerGrup = document.querySelector('.btnAddGrup')
    btnAddExerGrup.addEventListener('click', () => {
        if (inpExerGrup.value) {
            const addGrup = inpExerGrup.value
            exerGrup.push(addGrup)
            localStorage.setItem('exerGrup', JSON.stringify(exerGrup))
            inpExerGrup.value = ''
            render()

        }
    })


}
addExerGrup()

// --------------------------выпадающий список-----------------------------------------
function select() {
    function createSelect(exer) {
        return `
            <option class = 'xxx'>${exer}</option>
        `
    }

    // создаём уникальный массив для выпадающего 
    let arraySelect = []
    exercise.forEach(el => {
        arraySelect.push(el.exer)
    })
    const uniq = {}
    arraySelect.forEach(el => {
        uniq[el] = true
    })
    let arraySelectUnig = Object.keys(uniq)
    // --------------------------------------------

    let selectHTML = arraySelectUnig.map(el => {

        return createSelect(el)

    }).join('')

    document.querySelector('.select').innerHTML = `<option selected = 'selected'>All</option>` + selectHTML
}

// по аналогии делаем выпадающий список дат
function selctData() {
    function createSelectData(date) {
        return `
            <option class = 'xxxDate'>${date}</option>
        `
    }
    let arraySelectDate = []
    exercise.forEach(el => {
        arraySelectDate.push(el.date)
    })
    const uniqDate = {}
    arraySelectDate.forEach(el => {
        uniqDate[el] = true
    })
    let arraySelectUnigDate = Object.keys(uniqDate)

    let selectDateHtml = arraySelectUnigDate.map(el => {
        return createSelectData(el)
    }).join('')

    document.querySelector('.selectDate').innerHTML = `<option selected = 'selected'>All date</option>` + selectDateHtml
}

//---------------------------------------------------------------------------------------
function filter() {
    // фильтр по упражнениям
    let optionExer = document.querySelectorAll('.select')
    optionExer.forEach(option => {
        option.addEventListener('click', () => {

            if (option.value === 'All') {
                render()

            }
            else {
                const getExer = exercise.filter(el => {
                    return el.exer == option.value
                })
                let filterHTML = getExer.map(el => {
                    return createCard(el.exer, el.time, el.id, el.date)
                }).join('')
                document.querySelector('.content').innerHTML = filterHTML

                dell()
            }
        })
    })

    // фильтр по датам
    let optionDate = document.querySelectorAll('.selectDate')
    optionDate.forEach(option => {
        option.addEventListener('click', () => {
            if (option.value === 'All date') {
                render()
            }
            else {
                const getDate = exercise.filter(el => {
                    return el.date == option.value
                })
                let filterHTMLDate = getDate.map(el => {
                    return createCard(el.exer, el.time, el.id, el.date)
                }).join('')
                document.querySelector('.content').innerHTML = filterHTMLDate

                dell()
            }
        })
    })

}

//---------------------------------------------------------------------------
render()
filter()




