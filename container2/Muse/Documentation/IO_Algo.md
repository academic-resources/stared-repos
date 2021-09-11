# Temp

## Save Algo

```python
board_routes = Blueprint('board', __name__)

@board_routes.route('/<int:userId>', methods=['POST'])
def handleBoardSave(data):
  Boards = {
    title: data.projectName,
    user_id: userId,
    bpm: data.bpm,
    pad_list: [seq_id for seq_id in data.sequences.keys()]
  }
  
  # list of pad objects for bulk insert
  Pad = []

  for seq_id in data.sequences.keys():
    temp = {}
    current_pad = data.sequences[seq_id]

    # Store basic sequence info
    temp['title'] = current_pad.sequenceTitle
    temp['color'] = current_pad.color
    temp['multiplier'] = current_pad.multiplier
    temp['user_id'] = userId
    temp['board_id'] = 
    temp['block_list'] = [block_id for block_id in current_pad.columnOrder if len(current_pad.columns[block_id].taskIds) > 0 else None]

    # handle the note sequence
    for block_id in current_pad.columnOrder:
      current_block = current_pad.columns[block_id]
      if
      for note_id in current_block.taskIds:
        temp['note_seq'].append(note_id)
      temp['note_seq'].append(None)
    
    Pad.append(temp)

    # handle session insersions

    # handle session commit
    
```

## Load Algo

```python
  board_routes = Blueprint('board', __name__)

  @board_routes.route('/<int:userId>/<int:boardId>')  # GET specific board
  def specific_board(userId, boardId):
      board = Board.query.get(boardId)
      board = board.to_dict()

      board_pads = Pad.query.filter_by(board_id=board.id).all()
      return 
```
