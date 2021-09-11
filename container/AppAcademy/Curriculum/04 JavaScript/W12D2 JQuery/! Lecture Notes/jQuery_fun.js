const addList = function () {
  const $ul = $('<ul></ul>');
  $ul.addClass('list');
  const $body = $('body');
  $body.append($ul);
}

const seedList = function () {
  const lis = []
  const $ul = $('.list')
  const $li = $('<li>');
  $li.text('wash car');
  lis.push($li)
  const $li2 = $('<li>');
  $li2.text('cut toe nails');
  lis.push($li2)
  // $ul.append($li);
  // $ul.append($li2);

  lis.forEach($li => {
    $ul.append($li);
  })
}

const setupListItemHandler = function () {
  $ul = $('.list');
  $ul.on('click', 'li', (event) => {
    const clickedLi = event.currentTarget;
    const $clicked = $(clickedLi);
    // const completed = $clicked.data('complete');
    $clicked.toggleClass('completed');
    

  })
  // grab list elements
  // add handlers for all list elements
  //
  // const $lis = $('li');
  // $lis.click((event) => {
  //   event.stopPropagation();
  //   const clickedLi = event.currentTarget;
  //   const $clicked = $(clickedLi);
  //   $clicked.toggleClass('completed');
  // })
}

const addForm = function() {
  const $input = $('<input>');
  $input.attr('type', 'text');
  $input.attr('placeholder', 'eg. wash car');
  $input.addClass('todo-text');
  const liButton = $('<button>');
  liButton.text('Add Todo');
  const $form = $('<form>');
  $form.append($input);
  $form.append(liButton);
  $('body').append($form);
  addFormHandler($form);
}

const addFormHandler = function ($form) {
  $form.submit((event) => {
    event.preventDefault();  
    const value = $(event.currentTarget).find('.todo-text')[0].value;
    const $ul = $('.list')
    const $li = $('<li>');
    $li.text(value);
    $ul.append($li)
    // setupListItemHandler();
  })//callback
  // add a handler
  
}

const completeAll = function () {
  $lis = $('li');
  // $lis.removeClass('completed');
  $lis.addClass('completed')
  //grab all items
  //remove any class on item
  //add completed class
}

const addCompleteAllButton = function () {
  const $completeButton = $('<button>');
  $completeButton.text('Complete All');
  // $completeButton.on('click', completeAll)
  $completeButton.click(completeAll); //Same thing
  const $body = $('body');
  $body.append($completeButton)
  // create button
  // add handler (complete All)
  // add button to page

}

const callback = function () {
  addForm();
  addList();
  seedList();
  setupListItemHandler();
  addCompleteAllButton();
}

$(callback)