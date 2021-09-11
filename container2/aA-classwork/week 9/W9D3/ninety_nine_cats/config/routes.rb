Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :cats
end

# testkitty2 = Cat.create(birth_date: '2010/03/20', color: 'black', name: 'Ken', sex: 'M', description: "Most kitties find me irresistible. Rent me to see what all the hype is about. I'm purrrrrrty cool.")
