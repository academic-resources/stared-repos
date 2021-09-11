const entries = require('object.entries')

function targetFor (source, destructive) {
  if (Array.isArray(source)) {
    return destructive ? source : []
  } else if (typeof source === 'object') {
    return destructive ? source : {}
  }
}

module.exports = function breadthFilter (root, fn, destructive) {
  const target = targetFor(root, destructive)
  if (!target) return root

  const queue = [[ root, target, [] ]]
  const seen = new Set()
  let item

  while (item = queue.shift()) {
    const [ source, target, path ] = item
    for (const [ key, value ] of entries(source)) {
      const fieldPath = path.concat(key)
      const newTarget = targetFor(value, destructive)
      if (newTarget) {
        if (!seen.has(value)) {
          seen.add(value)
        } else {
          continue
        }
        target[key] = newTarget
        queue.push([ value, target[key], fieldPath ])
      } else {
        target[key] = fn(value, key, fieldPath)
      }
    }
  }

  return target
}
