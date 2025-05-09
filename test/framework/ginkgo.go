package framework

import (
	"fmt"
	"reflect"

	"github.com/onsi/ginkgo/v2"

	"github.com/kumahq/kuma/test/framework/versions"
)

var suiteFailed bool

func ShouldSkipCleanup() bool {
	suiteConfig, _ := ginkgo.GinkgoConfiguration()

	return (suiteFailed || ginkgo.CurrentSpecReport().Failed()) && suiteConfig.FailFast
}

func doIfNoSkipCleanup(fn func()) func() {
	return func() {
		if ShouldSkipCleanup() {
			return
		}

		fn()
	}
}

func AfterEachFailure(fn func()) bool {
	return ginkgo.JustAfterEach(func() {
		if !ginkgo.CurrentSpecReport().Failed() {
			return
		}
		fn()
	})
}

func E2EAfterEach(fn func()) bool {
	return ginkgo.AfterEach(doIfNoSkipCleanup(fn))
}

func E2EAfterAll(fn func()) bool {
	return ginkgo.AfterAll(doIfNoSkipCleanup(fn))
}

func E2EAfterSuite(fn func()) bool {
	return ginkgo.AfterSuite(doIfNoSkipCleanup(fn))
}

func E2ESynchronizedBeforeSuite(process1Body interface{}, allProcessBody interface{}, args ...interface{}) bool {
	ginkgo.AfterEach(func() {
		if ginkgo.CurrentSpecReport().Failed() {
			suiteFailed = true
		}
	})
	return ginkgo.SynchronizedBeforeSuite(process1Body, allProcessBody, args...)
}

func E2EBeforeSuite(fn func()) bool {
	ginkgo.AfterEach(func() {
		if ginkgo.CurrentSpecReport().Failed() {
			suiteFailed = true
		}
	})

	return ginkgo.BeforeSuite(func() {
		fn()
	})
}

func E2EDeferCleanup(args ...interface{}) {
	callback := reflect.ValueOf(args[0])
	if callback.Kind() != reflect.Func || callback.Type().NumOut() > 1 {
		ginkgo.Fail(fmt.Sprintf(
			"first argument in E2EDeferCleanup must be a function and is %T instead",
			args[0],
		))
	}

	fn := func(args []interface{}) error {
		if ShouldSkipCleanup() {
			return nil
		}

		var callArgs []reflect.Value
		for _, arg := range args {
			callArgs = append(callArgs, reflect.ValueOf(arg))
		}

		out := callback.Call(callArgs)
		if len(out) > 0 && !out[len(out)-1].IsNil() {
			return out[len(out)-1].Interface().(error)
		}

		return nil
	}

	ginkgo.DeferCleanup(fn, args[1:])
}

func SupportedVersionEntries() []ginkgo.TableEntry {
	ginkgo.GinkgoHelper()
	var res []ginkgo.TableEntry
	for _, v := range versions.UpgradableVersionsFromBuild(Config.SupportedVersions()) {
		res = append(res, ginkgo.Entry(nil, v))
	}
	return res
}
