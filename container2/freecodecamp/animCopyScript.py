import maya.cmds as mc
import functools
import maya.mel as mm
import pprint

class AnimCopyWindow(object):
    #@classmethod
    def showUI(cls):
        win = cls()
        win.create()
        return win
    def __init__(self):
        self.window = "Animation Copy Tool"
        self.title = "Animation Copier"
        self.size = (546,350)
   
    def pasteTheseKeys(self, *args):
        self.offsetVal = mc.intFieldGrp(self.int_offset, q=True, value1=True)
        self.selObj_pasteKeys = mc.ls(sl=True)
        
        for objectQuant in self.selObj_pasteKeys:
            print objectQuant
            self.ct = mc.currentTime(query = True)
            self.t = self.ct + self.offsetVal
            mc.currentTime(self.t)
           # mc.selectKey(selObj_pasteKeys[objectQuant])
            mc.pasteKey(time=(self.t,self.t), f=(1.0,1.0), option="merge", copies=1, to=0, fo=0, vo=0)

    def closeBtnCmd(self,*args):
        mc.deleteUI(self.window,window=True)
        
    def create(self):
        # check to see if window exists already
        if mc.window(self.window,exists=True): 
            mc.deleteUI(self.window,window=True)
            
        self.window = mc.window(self.window, title=self.title,widthHeight=self.size,menuBar=True)
        self.copyAnim = mc.window(title="Transfer Animation Tool", backgroundColor=[0.3,0.3,0.3],sizeable=False,resizeToFitChildren=True)
        #set the layout for UI
        mc.columnLayout(adjustableColumn=True)
        self.tx_src = mc.textFieldGrp(label="Source Object", editable=False, text=sel[0])
        self.int_offset = mc.intFieldGrp(label="Frame Offset Amount", value1=0)
        #add paste animation button
        self.btn1 = mc.button(label="PASTE ANIMATION", command=self.pasteTheseKeys, bgc=[0.1,0.1,0.5])

        #add close button window
        self.btn2 = mc.button(label="CLOSE WINDOW", command=self.closeBtnCmd, bgc=[0.2,0.2,0.2])
    
    
        mc.showWindow()

        #################################
        #####end of class definition#####
        #################################
        
def AnimationCopyTool_57():
    def keys_as_dictionary(channel):
        """return a dictionay of times:values for """
        keys = mc.keyframe(channel, q=True, tc=True) or []
        values = mc.keyframe(channel, q=True, vc=True) or []
        return dict(zip(keys, values))

    def channels():
        """return a dictionary of : for each animated plug selected"""
        keys = mc.keyframe(sl=True, n=True, q=True)
        result = {}

        for k in keys:
            plugs = mc.listConnections(k, p=True)[0]
            result[plugs]= keys_as_dictionary(k)
        return result

    #store selected object info
    sel = mc.ls(selection=True)

    if (len(sel) != 1):
        mm.eval("warning Must select one animated object;")

    else:
        mc.copyKey()
        win = AnimCopyWindow()
        win.create()

        pprint.pprint(channels())