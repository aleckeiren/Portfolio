<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * 
 * A Class to create an item to be added to a list
 */
class member implements JsonSerializable
{
    private $username;
    private $email;

    function __construct($username, $email)
    {
        $this->username = $username;
        $this->email = $email;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }
}
