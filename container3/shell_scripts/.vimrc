
"improve go-to-file functionality by guessing file extensions
set suffixesadd=.js,.jsx,.ts

"display all matching files when using tab completion, then press tab to cycle through them
set wildmenu
set wildmode=list:longest,full

set guitablabel=%N/\ %t\ %M
filetype on
filetype plugin on

"highlight the current line
set cursorline

"4 space tabs
set tabstop=4

"4 space tabs
set softtabstop=4

"when indenting, use 4-space indentations
set shiftwidth=4

"automatically insert spaces when pressing tab.
"set expandtab

"keep the cursor in the middle(ish) of the screen
set scrolloff=7

"does what it says on the tin
set autoindent

"line numbers
set number

"get fresh directory listing instead of reusing old one
let g:netrw_fastbrowse = 0
"enable the mouse in (V)isual mode and (I)nsert mode, without affecting
"behavior in normal mode.
set mouse=vi

"remove huge useless banner from file browser
"let g:netrw_banner = 0

"keybindings. mostly other ways to get to normal mode
inoremap kk <Esc>
inoremap vv <Esc>
inoremap vk <Esc>
inoremap kv <Esc>
inoremap tfw <Esc>
inoremap nuy <Esc>
nnoremap <SPACE> <Nop>
let mapleader = " "

"split the current line (left or right of the cursor)
nnoremap s a<CR><Esc>
nnoremap S i<CR><Esc>

"leader+s to save
nnoremap <leader>s :w<CR>
"leader+o to open a file
nnoremap <leader>o :call feedkeys(":e \<Tab>", 'tn')<CR>
"leader+f to search for files
nnoremap <leader>f :e **/*

"Buffer management

"change buffer by number according to visible buffer orderf
function ChangeBuffer(buffN)
	let buffers = []
	bufdo call add(buffers, @%)
	execute 'b' buffers[a:buffN]
endfunction

nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>1 :call ChangeBuffer(0)<CR>
nnoremap <leader>2 :call ChangeBuffer(1)<CR>
nnoremap <leader>3 :call ChangeBuffer(2)<CR>
nnoremap <leader>4 :call ChangeBuffer(3)<CR>
nnoremap <leader>5 :call ChangeBuffer(4)<CR>
nnoremap <leader>6 :call ChangeBuffer(5)<CR>
nnoremap <leader>7 :call ChangeBuffer(6)<CR>
nnoremap <leader>8 :call ChangeBuffer(7)<CR>
nnoremap <leader>9 :call ChangeBuffer(8)<CR>
nnoremap <leader>] :bn<CR>
nnoremap <leader>[ :bp<CR>

"snippet commands
nnoremap ,html :read ~/.vim/snippets/boilerplate.html<CR>3jf>a
nnoremap ,log :read ~/.vim/snippets/log.js<CR>f)i


"allow unsaved changes in hidden buffers
set hidden

"stop pretending to be vi
set nocompatible

"soft word-wrap (no linebreaks)
set wrap linebreak nolist

"add extra text to indicate wrapped lines
set showbreak=...


"wait 333 ms between keys of a sequence, instead of 1000
set timeoutlen=333

"open new split panes on the right or bottom, instead of top or left
set splitbelow
set splitright

set dir=~/.vim

"plugin stuff
" Specify a directory for plugins
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')


" File browser with On-demand loading
Plug 'scrooloose/nerdtree', { 'on':  'NERDTreeToggle' }
let NERDTreeQuitOnOpen = 1 " close nerdtree after opening a file
let NERDTreeMinimalUI = 1
" autocmd vimenter * NERDTree " open nerdtree when vim starts

" Surround text in quotes or braces or whatever
Plug 'tpope/vim-surround'

" git diffs in the gutter
Plug 'airblade/vim-gitgutter'

" add comments with <leader>c
Plug 'preservim/nerdcommenter'

" Syntax highlighting
Plug 'dense-analysis/ale'

" eslint is the ONLY js linter (dont automatically use jshint too)
let g:ale_linters = {
\   'javascript': ['eslint'],
\}
let g:ale_fixers = {
\   'javascript': ['eslint'],
\}

" simple status bar
Plug 'vim-airline/vim-airline'
let g:airline#extensions#tabline#enabled = 1 " enable tabline
let g:airline#extensions#tabline#formatter = 'default'
let g:airline#extensions#tabline#buffer_nr_show = 1

set noshowmode " disable the default status bar


Plug 'altercation/vim-colors-solarized'
syntax enable
set background=light
colorscheme solarized

"automatically use either the new or old syntax parsing regex, whichever is faster
"this stops vim from crashing on .ts files, among others
"this should be the default???? I don't know why this is necessary
set regexpengine=0

set list 
set listchars=tab:·\ 
" Initialize plugin system
call plug#end()



