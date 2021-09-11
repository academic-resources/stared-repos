// api_user_chirps      GET /api/users/: user_id /chirps    api/chirps#index {: format =>: json }
// api_users            GET /api/users                      api/users#index {: format =>: json }
//                      POST /api/users                     api/users#create {: format =>: json }
// new_api_user         GET /api/users /new                 api/users#new {: format=>: json }
// edit_api_user        GET /api/users/: id /edit           api/users#edit {: format =>: json }
// api_user             GET /api/users/: id                 api/users#show {: format =>: json }
//                      PATCH /api/users/: id               api/users#update {: format =>: json }
//                      PUT /api/users/: id                 api/users#update {: format =>: json }
//                      DELETE /api/users/: id              api/users#destroy {: format =>: json }
// new_api_session      GET /api/session /new               api/sessions#new {: format=>: json }
// api_session          DELETE /api/session                 api/sessions#destroy {: format =>: json }
//                      POST /api/session                   api/sessions#create {: format =>: json }
// api_search           POST /api/search                    api/users#search {: format =>: json }
// api_chirps           GET /api/chirps                     api/chirps#index {: format =>: json }
//                      POST /api/chirps                    api/chirps#create {: format =>: json }
// new_api_chirp        GET /api/chirps /new                api/chirps#new {: format=>: json }
// edit_api_chirp       GET /api/chirps/: id /edit          api/chirps#edit {: format =>: json }
// api_chirp            GET /api/chirps/: id                api/chirps#show {: format =>: json }
//                      PATCH /api/chirps/: id              api/chirps#update {: format =>: json }
//                      PUT /api/chirps/: id                api/chirps#update {: format =>: json }
//                      DELETE /api/chirps/: id             api/chirps#destroy {: format =>: json }
// api_likes            POST /api/likes                     api/likes#create {: format =>: json }
//                      DELETE /api/likes                   api/likes#destroy {: format =>: json }
// api_follows          POST /api/follows                   api/follows#create {: format =>: json }
// api_follow           DELETE /api/follows/: id            api/follows#destroy {: format =>: json }
// root                 GET /root#root

export const postUser = user =>
  $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user }
  })

export const postSession = user =>
  $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user }
  })

export const deleteSession = () =>
  $.ajax({
    method: 'DELETE',
    url: '/api/session'
  })
