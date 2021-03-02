#include "NodeLoaderTestMain.h"
#include <nan.h>

using v8::FunctionTemplate;

namespace nodeloadertest
{
    NAN_MODULE_INIT(Init)
    {
        NodeLoaderTestMain::Init(target);
	}

    NAN_MODULE_WORKER_ENABLED(nodeloadertest, Init)
}
