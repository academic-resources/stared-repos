#include "m_pd.h"
#include <math.h>
#include <stdio.h>
#include <stdlib.h>


#define SIZE_ARRAY 200
#define TEST_SIZE 200

static t_class *dynamicTW_class; //handle for the class

float recording_array[SIZE_ARRAY] = {0};
int arr_position = SIZE_ARRAY - 1;
float saveValue = 0.0;
int triggerGlobal = 0;

/* struct to hold cost of arrival from left, bottom, and diagonal */
typedef struct _leftbottom{
    float left;
    float bottom;
    float diag;
}leftBD; //typedef name

typedef struct _dynamicTW{
    t_object x_obj;

    int flag; //differentiates if how result of lcp is stored
    int match; //if 0 signal does not match else matches
    float testArray[TEST_SIZE];
    float storedSignalOne[SIZE_ARRAY];
    float storedSignalTwo[SIZE_ARRAY];

    t_inlet *in_mod_A, *in_mod_B;

    float signal[SIZE_ARRAY];
    float lcpValue;
    float compareValue;

    float initMatrix[SIZE_ARRAY][SIZE_ARRAY];
    leftBD costValues[SIZE_ARRAY-1][SIZE_ARRAY-1];

}t_dynamicTW; //typedef name

void checkStorage(t_dynamicTW *x){ //check if values being stored correctly
    int i;
    post("in check storage");
    for(i = 0; i < TEST_SIZE; i++){
        post("Signal 1: %f", x->storedSignalOne[i]);
        post("Signal 2: %f", x->storedSignalTwo[i]);
    }
}

void signalMatch(t_dynamicTW *x){
    float tenup = saveValue + (.0125*saveValue);
    float zeroValue = 0.00;
    if(x->compareValue <= tenup && x->compareValue >= zeroValue){
        x->match = 1;
        /* add code to trigger effect */
        post("Incoming Signal Matches Stored Signal. compareValue is %f and lcpValue is %f", x->compareValue, saveValue);
    }
    else{
        x->match = 0;
        post("Signal NO Match. compareVal is %f while lcpVal is %f", x->compareValue, saveValue);
    }
}
void reverseArray(t_dynamicTW *x){
    int i, j;
    i = SIZE_ARRAY - 1;
    j = 0;
    while(i > j){
        float temp = x->signal[i];
        x->signal[i] = x->signal[j];
        x->signal[j] = temp;
        i--;
        j++;
    }
}

void fileReader1(t_dynamicTW *x, char *path){
    //char const* const fileName = "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input.txt" ;/* should check that argc > 1 */
    FILE* file = fopen(path, "r"); /* should check the result */
    char line[256];
    int i = 0;
    while (fgets(line, sizeof(line), file)) {
        /* note that fgets don't strip the terminating \n, checking its
           presence would allow to handle lines longer that sizeof(line) */
        //post("file1: value at line %d is %s", i, line);
        x->storedSignalOne[i] = atof(line); // !!!!!!!!!!!!!!!!!!!!! REMOVE 1000
        i++;
    }
    fclose(file);
}
void fileReader2(t_dynamicTW *x, char *path){
    //char const* const fileName = "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input.txt" ;/* should check that argc > 1 */
    FILE* file = fopen(path, "r"); /* should check the result */
    char line[256];
    int i = 0;
    while (fgets(line, sizeof(line), file)) {
        /* note that fgets don't strip the terminating \n, checking its
           presence would allow to handle lines longer that sizeof(line) */
        //post("file2: value at line %d is %s", i, line);
        x->storedSignalTwo[i] = atof(line); // !!!!!!!!!!!!!!!!!!!!!!!!!!! REMOVE 1000
        i++;
    }
    fclose(file);
}

void replaceSignal2(t_dynamicTW *x){
    int i;
    for(i = 0; i < SIZE_ARRAY; i++){
        x->storedSignalTwo[i] = x->signal[i];
    }
}

/*
 1. Create a 2d array for our matrix
 2. fill in the left column and bottom row with our 2 signals
 3. Populate the rest of the matrix
 4. calculate least cost path
*/

void leastCostPath(t_dynamicTW *x){
    float temp, min;
    float result = 0;
    int i = SIZE_ARRAY - 2;
    int j = SIZE_ARRAY - 2;

//    post("starting point value left is %f", x->costValues[i][j].left);
//    post("starting point value bottom is %f", x->costValues[i][j].bottom);
//    post("starting point value diag is %f", x->costValues[i][j].diag);

    while(i >= 0 && j >= 0){
        float checkLeft = x->costValues[i][j].left;
        float checkBottom = x->costValues[i][j].bottom;
        float checkDiagonal = x->costValues[i][j].diag;

        temp = (checkLeft < checkBottom) ? checkLeft : checkBottom;
        min = (checkDiagonal < temp) ? checkDiagonal : temp;

        result += min;
        //post("min value is %f", min);

        if(min == checkDiagonal){
            if (i-1 < 0 && j-1 < 0){
                break;
            }
            else if (i-1 < 0){
                j--;
            }
            else if (j-1 < 0){
                i--;
            }
            else{
                i--;
                j--;
            }

            //post("changing index to [%d][%d]",j,i);
        }
        else if (min == checkLeft){
            if(j-1 < 0){
                break;
            }
            else{
                j--;
            }
            //post("changing index to [%d][%d]",j,i);
        }
        else{
            if(i-1 < 0){
                break;
            }
            else{
                i--;
            }
            //post("changing index to [%d][%d]",j,i);
        }

    }
    if(x->flag == 0){
//        x->lcpValue = result;
//        post("lcpValue: least cost path is %f", x->lcpValue);
        saveValue += result;
        post("storing to saveValue: current saveValue is %f", saveValue);
    }
    else if (x->flag == 1){
        x->compareValue = result;
        post("compareValue: least cost path is %f", x->compareValue);
    }


}
//Currently testing if I can populate 2d array
//WORKS
void dtw_genMatrix(t_dynamicTW *x){
    int i;
    for(i = 0; i<SIZE_ARRAY; i++){
        x->initMatrix[i][0] = x->storedSignalOne[i]; //populate the first column with signal 1 data points
        //post("at current column %d the value is %f and stored value is %f", i, x->initMatrix[i][0], x->storedSignalOne[i]);
        x->initMatrix[0][i] = x->storedSignalTwo[i]; //populate the last row with signal 2 data points
        //post("at current column %d the value is %f and stored value is %f", i, x->initMatrix[0][i], x->storedSignalTwo[i]);
    }

    /*  ############################### SOME THING IS HAPPENING IN BETWEEN WHERE THE VALUES GET MESSED UP ##################### */
//    //printing left column for signal 1
//    int j;
//    for (j = 0; j <SIZE_ARRAY;j++){
//        post("left column at index %d: %f", j, x->initMatrix[j][0]);
//    }
//
//    int k;  //printing bottom values for signal 2
//    for(k = 0; k < SIZE_ARRAY; k++){
//        post("bottom row at index %d: %f", k, x->initMatrix[0][k]);
//    }



    int z, y;
    for(z = 1; z< SIZE_ARRAY; z++){
        for(y = 1; y<SIZE_ARRAY; y++){
            float difference = x->storedSignalOne[z] - x->storedSignalTwo[y];
            x->initMatrix[z][y] = (float)pow(difference, 2); //finding the euclidian distance
        }
    }


    //just prints out the values
//    int xx, yy;
//    for(xx = 1; xx< SIZE_ARRAY; xx++){
//        for(yy=1; yy<SIZE_ARRAY; yy++){
//            post("at row = %d and column = %d value is: %f", xx, yy, x->initMatrix[xx][yy]);
//        }
//    }
//    post(" ");

    //testing values for left bottom values
    int q, r;
    for(q = 0; q< SIZE_ARRAY-1; q++){
        for(r= 0; r<SIZE_ARRAY-1; r++){
            //no left, bottom, or diagonal values
            if (q == 0 && r ==0){
                x->costValues[q][r].left = 0;
                x->costValues[q][r].bottom = 0;
                x->costValues[q][r].diag = 0;
            }
            //if row is bottom there cant be any bottom values or diagonal so set left values only
            else if (q == 0){
                if (r == 0){
                    x->costValues[q][r].left = 1000; //no possible left values
                }
                else{
                    x->costValues[q][r].left = abs((x->initMatrix[q+1][r+1] - x->initMatrix[q+1][r]));
                }
                x->costValues[q][r].bottom = 1000;
                x->costValues[q][r].diag = 1000;
            }

            //if column is left there cant be any left values or diagonal so set bottom values only
            else if (r == 0){
                if (q == 0){
                    x->costValues[q][r].bottom = 1000;
                }
                else{
                    x->costValues[q][r].bottom = abs((x->initMatrix[q+1][r+1] - x->initMatrix[q][r+1]));
                }
                x->costValues[q][r].left = 1000;
                x->costValues[q][r].diag = 1000;
            }

            //must have left, bottom, and diagonal values
            else{
                x->costValues[q][r].left = abs((x->initMatrix[q+1][r+1] - x->initMatrix[q+1][r]));
                x->costValues[q][r].bottom = abs((x->initMatrix[q+1][r+1] - x->initMatrix[q][r+1]));
                x->costValues[q][r].diag = .5*abs((x->initMatrix[q+1][r+1] - x->initMatrix[q][r]));//diagonal movement needs to be favored
            }

        }
    }

    //testing if values are correct

//    int qq, rr;
//    for(qq = 0; qq< SIZE_ARRAY-1; qq++){
//        for(rr=0; rr<SIZE_ARRAY-1; rr++){
//            post("value at row %d and column %d for left is %f: ", qq, rr, x->costValues[qq][rr].left);
//            post("value at row %d and column %d for bottom is %f: ", qq, rr, x->costValues[qq][rr].bottom);
//            post("value at row %d and column %d for diag is %f: ", qq, rr, x->costValues[qq][rr].diag);
//            post(" ");
//        }
//    }


    leastCostPath(x); //finds least cost path
}

/*what to do when bang is hit*/
void dtw_onBangMsg(t_dynamicTW *x){

//    post("*[dtw ] is set to go");
//    if(x->signal[SIZE_ARRAY - 1] == 0){
//        post("NONE");
//    }
//    else{
//        post("ARRAY TEST: %f", x->signal[SIZE_ARRAY - 1]);
//    }
    x->match = 0;
    x->flag = 0; //makes so that lcp value gets stored in lcpValue
    saveValue = 0.0;
    arr_position = SIZE_ARRAY - 1;
    fileReader1(x, "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input1.txt"); // read signal 1
    fileReader2(x, "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input2.txt"); // read signal 2
    dtw_genMatrix(x); //perform DTW
    fileReader2(x, "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input3.txt");
    dtw_genMatrix(x);
    fileReader2(x, "C:\\Users\\Raki\\Documents\\GitHub\\dynamicTW\\TB\\input4.txt");
    dtw_genMatrix(x);
    saveValue = saveValue / 3;
    post("saveValue: Least Cost Path is %f", saveValue);
    //post("does it get here?");
    triggerGlobal = 1;

}

void dtw_free(t_dynamicTW *x){
    inlet_free(x->in_mod_A);
    inlet_free(x->in_mod_A);
}

void dtw_onSet_A(t_dynamicTW *x, t_floatarg f){  /*function that gets called when an input is received */
    while(triggerGlobal == 0){
        /*do nothing*/
    }
    post("Number A: %f sending to array. Arr_position is %d",f, arr_position);
    //recording_array[0] = f;

    if(x->match == 1){
        post("Match has been detected. Freezing Program!");
        while(1){
            /*freezes the program*/
        }
    }
    else if(x->match == 0){
        //if (x->signal[SIZE_ARRAY - 1] == 0 && arr_position <= SIZE_ARRAY){ //checks if array is filled. If not then store incoming value to next index //if it breaks replace the bttoom with this
        if (arr_position >= 0){ //checks if array is filled. If not then store incoming value to next index
            x->signal[arr_position] = f;
            arr_position--;
        }

        else{                                 //If array is filled shift all values by 1 index and store at beginning of array
            int i;
            x->flag = 1; //makes it so that LCP result is stored in compared Value;
            for (i = SIZE_ARRAY - 1; i > 0; i--){
                x->signal[i]=x->signal[i-1];
            }
            x->signal[0] = f;
            //reverseArray(x); // works
            //post("Value at last index is %f", x->signal[SIZE_ARRAY-1]);
            replaceSignal2(x); //replaces the value in signal 2
            dtw_genMatrix(x); //performs dtw
            signalMatch(x); //checks is the signal is correct if it is trigger effect
            //dtw_free(x);
        }
    }
}

void dtw_onSet_B(t_dynamicTW *x, t_floatarg f){ /*function that gets called when an input is received */
    post("Number B: %f sending to array",f);
    recording_array[0] = f;
}
//initializer for the class
void *dynamicTW_new(t_floatarg f1, t_floatarg f2){ //parenth contains creation arg. temp stuff will replaced with arrays
    t_dynamicTW *x = (t_dynamicTW *)pd_new(dynamicTW_class); //initialize struct of type dtw

    x->in_mod_A = inlet_new(&x->x_obj, &x->x_obj.ob_pd, &s_float, gensym("ratio_A"));
    x->in_mod_B = inlet_new(&x->x_obj, &x->x_obj.ob_pd, &s_float, gensym("ratio_B"));
    return (void *)x;
}


//function to set up the class and call initializer
void dynamicTW_setup(void){
    /*class_new(t_symbol *name, t_newmethod newmethod,
    t_method freemethod, size_t size, int flags, t_atomtype arg1, ...); */
    dynamicTW_class = class_new(gensym("dynamicTW"), //defines the symbol in puredata
                          (t_newmethod)dynamicTW_new, //inializing method
                          0,
                          sizeof(t_dynamicTW),
                          CLASS_DEFAULT,//makes the box
                          A_DEFFLOAT,
                          A_DEFFLOAT,
                          0);
    class_addbang(dynamicTW_class, (t_method)dtw_onBangMsg);
    class_addmethod(dynamicTW_class,
                    (t_method)dtw_onSet_A,
                    gensym("ratio_A"),
                    A_DEFFLOAT,
                    0);
    class_addmethod(dynamicTW_class,
                (t_method)dtw_onSet_B,
                gensym("ratio_B"),
                A_DEFFLOAT,
                0);
}
