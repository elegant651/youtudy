// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;
contract Youtudy {
    
  struct Course {    
    string name;
    string metadata;
    uint256 price;
    address owner;
    bool active;
  }

  Course[] public courses;
  mapping(address => uint[]) public courseOwner;
  mapping(address => uint[]) public courseUser;

  mapping(address => uint256) balanceOfUsers;

  function createCourse(string memory _name, string memory _metadata, uint256 _price) public returns(bool) {
    uint courseId = courses.length;
    Course memory newCourse;
    newCourse.name = _name;
    newCourse.price = _price;
    newCourse.metadata = _metadata;    
    newCourse.owner = msg.sender;
    newCourse.active = true;

    courses.push(newCourse);
    courseOwner[msg.sender].push(courseId);

    emit CourseCreated(msg.sender, courseId);
    return true;
  }

  function getCount() public view returns(uint) {
    return courses.length;
  }

  function getCoursesOfOwner(address _owner) public view returns(uint[] memory) {
    uint[] memory ownedCourses = courseOwner[_owner];
    return ownedCourses;
  }

  function getCoursesOfUser(address _user) public view returns(uint[] memory) {
    uint[] memory userCourses = courseUser[_user];
    return userCourses;
  }

  function getCourseById(uint _courseId) public view returns(
    string memory name,
    uint256 price,
    string memory metadata,
    address owner,
    bool active
  ) {
    Course memory mem = courses[_courseId];
    return (
      mem.name,
      mem.price,
      mem.metadata,
      mem.owner,
      mem.active
    );
  }

  function startCourse(uint _courseId) payable public {
    Course memory myCourse = courses[_courseId];
    
    uint amount = msg.value;
    require(amount==myCourse.price);

    balanceOfUsers[msg.sender] -= amount;
    courseUser[msg.sender].push(_courseId);

    emit CourseStarted();
  }

  function finishCourse(uint _courseId) public {
    Course memory myCourse = courses[_courseId];

    uint amount = myCourse.price;
    balanceOfUsers[msg.sender] += amount;

    emit CourseFinished();
  }

  event CourseCreated(address _owner, uint _courseId);
  event CourseStarted();
  event CourseFinished();
 
}