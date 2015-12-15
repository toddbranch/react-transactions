// mock socket
var io = function() {
  return {
    emit: jasmine.createSpy(),
    on: jasmine.createSpy()
  };
};
