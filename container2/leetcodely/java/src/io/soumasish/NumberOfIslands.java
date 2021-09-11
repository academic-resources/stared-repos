package io.soumasish;

public class NumberOfIslands {
    private int[] dx = {0, 0, -1, 1};
    private int[] dy= {1, -1, 0, 0};

    public int numIslands(char[][] grid) {
        int count = 0;
        if(grid.length == 0 || grid[0].length == 0) return 0;
        for (int i = 0; i <grid.length ; i++) {
            for (int j = 0; j <grid[i].length ; j++) {
                if (grid[i][j] == '1'){
                    count += 1;
                    dfs(grid, i, j);
                }
            }
        }
        return count;

    }
    public void dfs(char[][] grid, int i, int j){
        if(i < 0 || i > grid.length || j < 0 || j > grid[0].length || grid[i][j] == '0') return;
        grid[i][j] = '0';
        for (int k = 0; k <4 ; k++) {
            int nx = i + dx[k];
            int ny = j + dy[k];
            dfs(grid, nx, ny);

        }

    }
}
