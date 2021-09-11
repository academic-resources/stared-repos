# Coversion Docs for retrieveing and saving Board Data

## Database

* Block
  * id: int, PK
  * title: string (block id)
  * note_list: arr (list of note names and library)
  * user_id: int, FK
  * pad_id: int, FK
  
* Pad
  * id: int, PK
  * title: string
  * color: string
  * multiplier: int
  * block_list: arr (list of block Ids)
  * user_id: int, FK
  * board_id: int, FK

* Board
  * id: int, PK
  * user_id: int, FK
  * title: string
  * bpm: int (default 1000)
  * pad_list: arr (list of Pad Ids)

## Example

* Block
  * 1
    * id: 1
    * title: 'block-1'
    * note_list: ['808-808_5-1', 'Misc-Rest_1-5', 'Misc-Rest_1-4', '808-808_1-2']
    * user_id: 1
    * board_id: 1
    * pad_id: 0
  
  * 2
    * id: 2
    * title: 'block-2'
    * note_list: ['808-808_1-3']
    * user_id: 1
    * board_id: 1
    * pad_id: 0
  
  * 3
    * id: 3
    * title: 'block-1'
    * note_list: ['Snare-Snare_2-1', null]
  
* Pad
  * 0
    * id: 0
    * title: '808'
    * color: '#AFB1D4'
    * multiplier: 1,
    * block_list: [1, 2, null, null]
    * user_id: 1
    * board_id: 1
  
  * 1
    * id: 1
    * title: 'Snare'
    * color: '#AFB1D4',
    * multiplier: 1,
    * block_list: [3, null],
    * user_id: 1,
    * board_id: 1

* Board
  * id: 1
  * user_id: 1
  * title: 'Smooth Cabana'
  * bpm: 857
  * pad_list: [0, 1]

## Save Data Before Session Commit

```python
Pads = [
  {
    title: '808',
    color: '#AFB1D4',
    multiplier: 1,
    block_list: [0, 1, None, None],
    note_seq: ['808-808_5-1', 'Misc-Rest_1-5', 'Misc-Rest_1-4', '808-808_1-2', None, '808-808_1-3', None],
    user_id: 1,
    board_id: 1,
  },
  {
    title: 'Snare',
    color: '#AFB1D4',
    multiplier: 1,
    block_list: [0, None],
    note_seq: ['Snare-Snare_2-1', None],
    user_id: 1,
    board_id: 1,
  },
]

Board = {
  title: 'Smooth Cabana',
  bpm: 857,
  user_id: 1
}
```
