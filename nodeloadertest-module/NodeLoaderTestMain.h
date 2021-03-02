#ifndef NODELOADERTESTMAIN_H
#define NODELOADERTESTMAIN_H

#include <nan.h>

namespace nodeloadertest
{
	class NodeLoaderTestMain
		: public Nan::ObjectWrap
	{
	public:
		static NAN_MODULE_INIT(Init);

	private:
		static Nan::Persistent<v8::Function> constructor;
		static NAN_METHOD(New);
		static NAN_METHOD(TestFunctionWithString);

		explicit NodeLoaderTestMain();
		~NodeLoaderTestMain();
	};
}

#endif
