/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ejb;

import javax.ejb.Stateless;

/**
 *
 * @author Kathir
 */
@Stateless
public class NewSessionBean implements NewSessionBeanRemote {

    String[] verifiedNames = new String[]{ "subash","nagaraj","manoj","sukesh","gokul" }; 
    
 @Override
    public String businessMethod(String name) {
        
      String res="UnSucessful";
      boolean isNamePresent=false;
      for(String i: verifiedNames)
        {
            if(i.equals(name))
            {
               isNamePresent=true;
            }           
        }

        if(isNamePresent)
        {
            res="Verifed User";
            isNamePresent=false;
        }
        else
        {
            res="Unverfied User";
        }
        return res;
    }
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

   
    
}
