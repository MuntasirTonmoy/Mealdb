const foodField = document.getElementById('search-field');
foodField.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('button-search').click();
    }
})

const loadMeal = () => {
    const foodField = document.getElementById('search-field');
    const foodText = foodField.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodText}`; // make a dynamic url
    foodField.value = '';
    // console.log(url); 

    fetch(url)
        .then(response => response.json())
        .then(data => displayMeal(data))
}

const displayMeal = (mealName) => {
    // console.log(mealName);
    const searchResult = document.getElementById('search-result');
    const meals = mealName.meals;
    // clear previous item
    const mealDiv = document.getElementById('meal-detail');
    mealDiv.textContent = '';
    searchResult.textContent = '';
    // console.log(meals);
    meals.forEach(meal => {
        // console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div onclick="loadMealDetails(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}
                        </p>
                    </div>
                </div>
        `
        searchResult.append(div);
    });

}

const loadMealDetails = (mealId) => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(mealDetails => displayMealDetails(mealDetails.meals[0]))

}

const displayMealDetails = meals => {
    console.log(meals);
    const mealDiv = document.getElementById('meal-detail');
    mealDiv.textContent = '';
    const mealDetailsDiv = document.createElement('div');
    mealDetailsDiv.innerHTML = `
    <div class="card">
    <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${meals.strMeal}</h5>
    <p class="card-text">${meals.strInstructions.slice(0, 100)}</p>
    <a href="${meals.strYoutube}" class="btn btn-danger text-white">Watch in Youtube</a>
    </div>
    </div>`
    mealDiv.append(mealDetailsDiv);
}