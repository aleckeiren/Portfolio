<?php
/**
 * Alec Pasion, 000811377
 * Created: December 8, 2020
 * 
 * A Class to create an item to be added to a list
 */
class listitem implements JsonSerializable
{
    private $course;
    private $professor;
    private $id;

    function __construct($course, $professor, $id)
    {
        $this->course = $course;
        $this->professor = $professor;
        $this->id = $id;
    }

    /**
     * Called by json_encode  
     */
    public function jsonSerialize()
    {
        return  get_object_vars($this);
    }
}
