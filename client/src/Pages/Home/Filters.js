const categories = [
  {
    name: 'Electronics',
    value: 'electronics',
  },
  {
    name: 'Home',
    value: 'home',
  },
  {
    name: 'Fashion',
    value: 'fashion',
  },
  {
    name: 'Sports',
    value: 'sports',
  },
  {
    name: 'others',
    value: 'others',
  },
];

const ages = [
  {
    name: '0-2 years old',
    value: '0-2',
  },
  {
    name: '3-5 years old',
    value: '3-5',
  },
  {
    name: '6-8 years old',
    value: '6-8',
  },
  {
    name: '9-12 years old',
    value: '9-12',
  },
  {
    name: '12+ years old',
    value: '13-120',
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className=" w-64 flex flex-col">
      <div className="flex justify-between">
        <h1 className=" text-cyan-700 text-2xl uppercase">Filters</h1>
        <i
          className="ri-close-circle-line text-2xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600">Categories</h1>

        <div className="flex flex-col">
          {categories.map((category, index) => {
            const categoryId = `category-${index}`; // Generate a unique id for each label
            return (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={categoryId} // Use the unique id for the corresponding input
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor={categoryId}>{category.name}</label>
              </div>
            );
          })}
        </div>

        <h1 className="text-gray-600 mt-5">Ages</h1>

        <div className="flex flex-col">
          {ages.map((age, index) => {
            const ageId = `age-${index}`;
            return (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={ageId}
                  name="age"
                  className="max-width"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor={ageId}>{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Filters;
