module Main where

f :: Int -> Int
f = \x ->
      x + 1

main = do
 putStrLn $ show (f 2)