import System.Environment
import Data.List

main = do
  args <- getArgs
  putStrLn(head args)
