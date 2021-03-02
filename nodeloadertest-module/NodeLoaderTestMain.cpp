#include "NodeLoaderTestMain.h"
#include <string>

static std::string toNativeString(v8::Local<v8::Value> value)
{
	auto nanString = Nan::To<v8::String>(value).ToLocalChecked();
	Nan::Utf8String utf8String(nanString);
	std::string nativeString(*utf8String, utf8String.length());
	return nativeString;
}

static v8::Local<v8::Value> toNodeJsString(const std::string& nativeValue)
{
	return Nan::New(nativeValue).ToLocalChecked();
}

namespace nodeloadertest
{
	Nan::Persistent<v8::Function> NodeLoaderTestMain::constructor;

	NAN_MODULE_INIT(NodeLoaderTestMain::Init)
	{
		v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
		tpl->SetClassName(Nan::New("NodeLoaderTestMain").ToLocalChecked());
		tpl->InstanceTemplate()->SetInternalFieldCount(1);

		Nan::SetPrototypeMethod(tpl, "echo", TestFunctionWithString);

		constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
		Nan::Set(target, Nan::New("NodeLoaderTestMain").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
	}

	NAN_METHOD(NodeLoaderTestMain::New)
	{
		if (info.IsConstructCall())
		{
			auto obj = new NodeLoaderTestMain();
			obj->Wrap(info.This());
			info.GetReturnValue().Set(info.This());
		}
		else
		{
			v8::Local<v8::Function> cons = Nan::New(constructor);
			info.GetReturnValue().Set(Nan::NewInstance(cons).ToLocalChecked());
		}
	}

	NAN_METHOD(NodeLoaderTestMain::TestFunctionWithString)
	{
		auto self = Nan::ObjectWrap::Unwrap<NodeLoaderTestMain>(info.This());
		auto stringValue = toNativeString(info[0]);
    	info.GetReturnValue().Set(toNodeJsString(stringValue));
	}

	NodeLoaderTestMain::NodeLoaderTestMain()
	{
	}

	NodeLoaderTestMain::~NodeLoaderTestMain()
	{
	}
}
